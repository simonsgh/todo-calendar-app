# todo-calendar-app

## Demo

Check demo site [todo-calendar-app](https://todo-calendar-app.onrender.com)

## Webhook usage

```curl
curl --location --request POST 'https://todo-calendar-api.onrender.com/webhooks/event-path' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content": "data for event"
}'
```
