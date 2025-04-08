import pandas as pd
from collections import defaultdict
from Section_B_1_A import validate_time_series


def compute_hourly_average_large_file(file_path, chunk_size=100000):
    # Dictionary to store sum and count of values for each hour
    hourly_data = defaultdict(lambda: [0, 0])

    # Read the CSV file in chunks
    for chunk in pd.read_csv(file_path, parse_dates=["timestamp"], chunksize=chunk_size):
        # Convert "value" to numeric and remove rows with missing "value"
        chunk["value"] = pd.to_numeric(chunk["value"], errors="coerce")
        chunk = chunk.dropna(subset=["value"])

        # Extract hour from "timestamp"
        chunk["hour"] = chunk["timestamp"].dt.hour

        # Calculate sum and count per hour
        grouped = chunk.groupby("hour")["value"].agg(["sum", "count"])

        # Add results to hourly_data
        for hour, row in grouped.iterrows():
            hourly_data[hour][0] += row["sum"]
            hourly_data[hour][1] += row["count"]

    # Calculate average for each hour
    hourly_avg = {hour: round(sum_count[0] / sum_count[1], 2) for hour, sum_count in hourly_data.items()}

    # Return the result
    return pd.Series(hourly_avg, name="Average")


# Example usage:
file_path = "time_series.csv"
clean_file_path = validate_time_series(file_path)
hourly_avg_result = compute_hourly_average_large_file(clean_file_path)

# Save the result to a CSV file
hourly_avg_result.to_csv("hourly_averages.csv", header=True)

# Print the result (optional)
print(hourly_avg_result)


