import pandas as pd
from datetime import datetime

def validate_time_series(file_path):
    try:
        # Read the CSV file into a DataFrame
        df = pd.read_csv(file_path)

        # Clean column names: remove extra spaces and convert to lowercase
        df.columns = df.columns.str.strip().str.lower()

        # Check if required columns ("timestamp" and "value") are in the DataFrame
        required_columns = {"timestamp", "value"}
        if not required_columns.issubset(df.columns):
            raise ValueError(f"Missing columns! Found columns: {df.columns.tolist()}")

        # Clean "timestamp" and "value" columns by removing extra spaces
        df["timestamp"] = df["timestamp"].astype(str).str.strip()
        df["value"] = df["value"].astype(str).str.strip()

        # Convert "timestamp" to datetime format
        df["timestamp"] = pd.to_datetime(df["timestamp"], format="%d/%m/%Y %H:%M", errors="coerce")

        # Check for invalid timestamps
        invalid_timestamps = df["timestamp"].isna().sum()
        if invalid_timestamps > 0:
            print(f"Found {invalid_timestamps} invalid timestamps (incorrect format)")

        # Check for duplicate rows based on "timestamp"
        duplicate_rows = df.duplicated(subset=["timestamp"])
        if duplicate_rows.any():
            print(f"Found {duplicate_rows.sum()} duplicate rows based on timestamp")

        # Convert "value" to numeric
        df["value"] = pd.to_numeric(df["value"], errors="coerce")

        # Check for invalid values in the "value" column
        invalid_values = df["value"].isna().sum()
        if invalid_values > 0:
            print(f"Found {invalid_values} non-numeric values in the 'value' column")

        # Print a message when all checks are completed
        print("All checks completed!")

        # Get rows with problems
        problematic_rows = df[df["timestamp"].isna() | df["value"].isna() | duplicate_rows]

        # Filter out rows with problems
        valid_df = df[~df["timestamp"].isna() & ~df["value"].isna() & ~duplicate_rows]

        # Save the valid data to a new CSV file
        output_path = "clean_time_series.csv"
        valid_df.to_csv(output_path, index=False)
        return output_path

    except Exception as e:
        # Print any error that occurs during the validation process
        print(f"Error during validation: {e}")

# Define the file path
file_path = "time_series.csv"
# Call the function to validate the time series data
validate_time_series(file_path)

