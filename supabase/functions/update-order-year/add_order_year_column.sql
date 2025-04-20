CREATE OR REPLACE FUNCTION add_order_year_column()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if the column exists
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'customer_orders'
    AND column_name = 'order_year'
  ) THEN
    -- Add the column if it doesn't exist
    ALTER TABLE customer_orders
    ADD COLUMN order_year text;
  END IF;
END;
$$; 