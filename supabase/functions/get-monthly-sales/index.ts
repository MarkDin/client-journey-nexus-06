import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            headers: corsHeaders
        });
    }
    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('环境变量缺失: ' + (!supabaseUrl ? 'SUPABASE_URL ' : '') + (!supabaseKey ? 'SUPABASE_SERVICE_ROLE_KEY' : ''));
        }
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { start_date, end_date } = await req.json();
        console.log('查询参数:', {
            start_date,
            end_date
        });
        // 构建查询
        let query = supabase.from('monthly_client_data').select(`
        id,
        month,
        amount,
        customer_code,
        customers!inner (
          region,
          company
        )
      `);
        // 添加日期过滤条件
        if (start_date) {
            query = query.gte('month', start_date);
        }
        if (end_date) {
            query = query.lte('month', end_date);
        }
        const { data: rawData, error: queryError } = await query;
        if (queryError) {
            console.error('查询错误:', queryError);
            throw queryError;
        }
        console.log('原始数据:', rawData);
        // 处理数据
        const monthlyData = new Map();
        const monthlyTotals = new Map();
        // 第一步：汇总数据
        rawData?.forEach((row) => {
            const month = new Date(row.month).toISOString().slice(0, 7);
            const region = row.customers?.region || '未分类';
            const amount = parseFloat(row.amount) || 0;
            // 更新月度区域数据
            if (!monthlyData.has(month)) {
                monthlyData.set(month, new Map());
            }
            const regionMap = monthlyData.get(month);
            if (!regionMap.has(region)) {
                regionMap.set(region, {
                    amount: 0,
                    customers: new Map()
                });
            }
            const regionData = regionMap.get(region);
            regionData.amount += amount;
            // 使用 Map 存储客户信息，key 为 customer_code
            regionData.customers.set(row.customer_code, {
                customer_code: row.customer_code,
                company: row.customers?.company || '未知公司',
                amount: amount
            });
            // 更新月度总额
            monthlyTotals.set(month, (monthlyTotals.get(month) || 0) + amount);
        });
        // 第二步：格式化结果
        const result = [];
        let id = 1;
        monthlyData.forEach((regionMap, month) => {
            regionMap.forEach((data, region) => {
                result.push({
                    id: id.toString(),
                    report_month: month,
                    region_name: region,
                    customers: Array.from(data.customers.values()),
                    region_total: Number(data.amount.toFixed(2)),
                    percentage: Number((data.amount / monthlyTotals.get(month) * 100).toFixed(2))
                });
                id++;
            });
        });
        // 按月份和区域排序
        result.sort((a, b) => {
            const monthCompare = a.report_month.localeCompare(b.report_month);
            if (monthCompare !== 0) return monthCompare;
            return (a.region_name || '').localeCompare(b.region_name || '');
        });
        return new Response(JSON.stringify(result), {
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('错误详情:', error);
        return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : '未知错误',
            details: error
        }), {
            status: 500,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            }
        });
    }
});

