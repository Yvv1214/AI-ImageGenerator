from fastapi import FastAPI
from decouple import config
import openai
import os


app = FastAPI()

openai.organization = config('OPEN_AI_ORG')
openai.api_key = config('OPEN_AI_KEY')



@app.get("/")
async def root():
    return {"message": "Hello World"}



@app.post('/createImg')
async def createImg():

    try:
        prompt = "yellow cats"

        response = openai.images.generate(
        model="dall-e-3",
        prompt= prompt,
        size="1024x1024",
        quality="standard",
        n=1,
        )

        image_url = response.data[0].url
        print(image_url)
    
    except openai.OpenAIError as e:
        print(e.http_status)
        print(e.error)
        return {"image_url": image_url}