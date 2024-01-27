from fastapi import FastAPI, HTTPException
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
    
        if not image_url:
            return HTTPException(status_code=400, detail='failed to get openai response')
        
        
        

@app.post('/variation')
async def variation():

    response = openai.images.create_variation(
    image=open("image_edit_original.png", "rb"),
    n=2,
    size="1024x1024"
    )

    image_url = response.data[0].url
    print(image_url)

    if not image_url:
         return HTTPException(status_code=400, detail='failed to get openai response')