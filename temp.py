from pyngrok import ngrok

# Replace with your ngrok auth token
ngrok.kill()
ngrok.set_auth_token("3HRjpFMqfHffIlX0oPqHITBQalK_457XLfBzcPqizqijAyV1p")

public_url = ngrok.connect(5173)
print("Public URL:", public_url.public_url+"/docs")