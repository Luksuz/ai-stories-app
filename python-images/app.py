from openai import OpenAI
import json 

client = OpenAI(api_key='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')

#refactor the model to use chat completions and turbo model

def lambda_handler(event, context):
    body = json.loads(event['body'])
    imagePrompt = body['imagePrompt']
    response = client.images.generate(
    model="dall-e-2",
    prompt=imagePrompt,
    n= 1,
    size= "256x256",
    )
    image_url = response.data[0].url
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'imagePrompt': image_url
        }),
        "isBase64Encoded": False
    }

