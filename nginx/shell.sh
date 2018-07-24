docker container run \
  -p 8080:80 \
  -p 8081:443 \
  --rm \
  --name nginx-http2 \
  --volume $PWD/html:/usr/share/nginx/html \
  --volume $PWD/conf:/etc/nginx \
  nginx

# Self signed cert
# sudo openssl req \
#   -x509 \
#   -nodes \
#   -days 365 \
#   -newkey rsa:2048 \
#   -keyout example.key \
#   -out example.crt