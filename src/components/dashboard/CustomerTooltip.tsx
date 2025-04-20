
interface CustomerTooltipProps {
  active?: boolean;
  payload?: any[];
}

export function CustomerTooltip({ active, payload }: CustomerTooltipProps) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  return (
    <div className="rounded-lg border bg-white p-2 shadow-md">
      <p className="font-medium">{data.name}</p>
      {/* <p className="text-sm text-muted-foreground">
        Short-term Trend: {data.x.toFixed(1)}%
      </p>
      <p className="text-sm text-muted-foreground">
        Long-term Trend: {data.y.toFixed(1)}%
      </p> */}
      <p className="text-sm text-muted-foreground">
        Total Order Amount: ${data.totalAmount.toLocaleString()}
      </p>
      <p className="text-sm text-muted-foreground">
        Country: {data.country}
      </p>
      <p className="text-sm text-muted-foreground">
        Sales Level: {data.sales}
      </p>
      {/* <p className="text-sm text-muted-foreground text-xs opacity-70">
        Code: {data.customerCode}
      </p> */}
    </div>
  );
}
