from openai import OpenAI
client = OpenAI(
    api_key="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"
)

response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
    {"role": "user", "content": "Who won the world series in 2020?"}
  ]
)
print(response.choices[0].message.content)
