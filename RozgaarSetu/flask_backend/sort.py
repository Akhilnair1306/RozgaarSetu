import json

# Load the JSON from a file or directly from a string
with open('countries+states+cities.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Filter only for India
india_data = None
for country in data:
    if country.get("name") == "India":
        india_data = country
        break

# Save India data to a new file
if india_data:
    with open('india_data.json', 'w', encoding='utf-8') as f:
        json.dump(india_data, f, indent=4, ensure_ascii=False)
    print("India data saved to 'india_data.json'")
else:
    print("India not found in the dataset.")
