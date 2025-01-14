import requests
import json
import sys

def make_post_request(url, data):
    try:
        with open("file", "w") as j:
            json.dump(data, j)

        with open("file", "r") as j:
            data2 = json.load(j)

        headers = {'Content-Type' : 'application/json', 'Authorization' : 'Bearer your_token'}
        response = requests.post(url, json=data2, headers=headers)
        print(response)
        if response.status_code == 200:
            print(f"POST request did work: {response.status_code}")
            print("Response: ", response.text)
        else:
            print(f"POST request did not work: {response.status_code}")
            print("Response: ", response.text)
    except Exception as e:
        print(e)


def make_get_request(url, data):
    try:
        with open("file", "w") as j:
            json.dump(data, j)

        with open("file", "r") as j:
            data2 = json.load(j)

        headers = {'Content-Type' : 'application/json', 'Authorization' : 'Bearer your_token'}
        response = requests.get(url, json=data2, headers=headers)
        print(response)
        if response.status_code == 200:
            print(f"GET request did work: {response.status_code}")
            print("Response: ", response.text)
        else:
            print(f"GET request did not work: {response.status_code}")
            print("Response: ", response.text)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    #parse(sys.argv[1])
    port = 8080
    ip = "127.0.0.1"
    url = "http://" + str(ip) + ":" + str(port) + "/workout"

    data = {"command" : "postSplit",
            "Shoulders" : ["shoulderPress", "lateralRaises", "facePulls"]}

    # data = {"command" : "postWorkout",
    #         "workouts" : {"shoulderPress" : [40, "Try 45"]}}
    
    #data = {"command" : "deleteWorkout",
    #        "workouts" : "lateralRaises"}
    make_post_request(url, data)
