import pandas as pd
from collections import defaultdict, Counter
import heapq




def process_excel_file(file_path, chunk_size, N):
    # Create a dictionary to store the count of each error code
    error_code_dict = defaultdict(int)

    # Read the Excel file into a DataFrame (no header row, use openpyxl engine)
    df = pd.read_excel(file_path, header=None, engine='openpyxl')

    # Loop through the DataFrame in chunks of size `chunk_size`
    for start_row in range(0, len(df), chunk_size):
        # Get a chunk of rows from the DataFrame
        chunk = df.iloc[start_row:start_row + chunk_size]

        # Extract the error codes from the first column (assuming they follow the pattern 'Error: <code>')
        error_codes = chunk[0].astype(str).str.extract(r'Error: (\w+)')[0]

        # Count the frequency of each error code in this chunk
        chunk_counter = Counter(error_codes.dropna())

        # Add the counts from this chunk to the overall error code dictionary
        for error_code, count in chunk_counter.items():
            error_code_dict[error_code] += count

    # Get the top N most common error codes from the dictionary
    most_common_error_codes = heapq.nlargest(N, error_code_dict.items(), key=lambda x: x[1])

    # Return the most common error codes and their counts
    return most_common_error_codes


# Example usage of the function
file_path = 'logs.txt.xlsx'
chunk_size = 10000
N = 5

# Print the most common error codes found in the file
print(process_excel_file(file_path, chunk_size, N))

