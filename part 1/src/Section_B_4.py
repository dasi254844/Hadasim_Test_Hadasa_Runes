import pandas as pd
from collections import defaultdict

def compute_hourly_average_large_file(file_path, chunk_size=100000):
    # Dictionary to store sum and count of values for each hour
    hourly_data = defaultdict(lambda: [0, 0])

    # Function to determine the column name based on file type
    def get_value_column(file_path):
        if file_path.endswith(".csv"):
            return "value"  # In CSV, column is likely named 'value'
        elif file_path.endswith(".parquet"):
            return "mean_value"  # In Parquet, column might be named 'mean_value'
        else:
            raise ValueError("Unsupported file format. Please use CSV or Parquet.")

    # Determine the correct column name based on the file type
    value_column = get_value_column(file_path)

    # Check file extension and read the appropriate file type
    if file_path.endswith(".csv"):
        file_reader = pd.read_csv
        iterator = file_reader(file_path, parse_dates=["timestamp"], dayfirst=True, chunksize=chunk_size)
    elif file_path.endswith(".parquet"):
        file_reader = pd.read_parquet
        iterator = [file_reader(file_path)]  # Since Parquet files are read as a single DataFrame
    else:
        raise ValueError("Unsupported file format. Please use CSV or Parquet.")

    # Iterate through the file chunks (for CSV) or the single DataFrame (for Parquet)
    for chunk in iterator:

        # Clean column names (strip any extra spaces)
        chunk.columns = chunk.columns.str.strip()

        # Ensure the value column (either 'value' or 'mean_value') is numeric and handle missing data
        if value_column in chunk.columns:
            chunk[value_column] = pd.to_numeric(chunk[value_column], errors="coerce")
            chunk = chunk.dropna(subset=[value_column])
        else:
            print(f"Error: '{value_column}' column is missing!")

        # Extract hour from "timestamp"
        if "timestamp" in chunk.columns:
            chunk["hour"] = pd.to_datetime(chunk["timestamp"]).dt.hour
        else:
            print("Error: 'timestamp' column is missing!")

        # Calculate sum and count per hour
        grouped = chunk.groupby("hour")[value_column].agg(["sum", "count"])

        # Add results to hourly_data
        for hour, row in grouped.iterrows():
            hourly_data[hour][0] += row["sum"]
            hourly_data[hour][1] += row["count"]

    # Calculate average for each hour
    hourly_avg = {hour: round(sum_count[0] / sum_count[1], 2) for hour, sum_count in hourly_data.items()}

    # Return the result as a pandas Series
    return pd.Series(hourly_avg, name="Average")

# Example usage:
file_path_csv = "time_series.csv"  # Or "time_series.parquet"
hourly_avg_result_csv = compute_hourly_average_large_file(file_path_csv)

file_path_parquet = "time_series.parquet"  # Or "time_series.csv"
hourly_avg_result_parquet = compute_hourly_average_large_file(file_path_parquet)

# Print the result for CSV and Parquet files
print(hourly_avg_result_csv)
print(hourly_avg_result_parquet)