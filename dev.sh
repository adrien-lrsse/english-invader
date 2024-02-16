#!/bin/bash

# Fonction pour construire l'image Docker
build() {
    docker build -t flask_docker .
}

# Fonction pour lancer l'application Flask
run() {
    docker run -p 5000:5000 flask_docker
}

# Fonction pour lancer l'application Flask en mode debug
test() {
    docker run -p 5000:5000 -e FLASK_DEBUG=1 -v "$(pwd)":/app flask_docker
}

# Vérifier le premier argument passé au script et appeler la fonction correspondante
case "$1" in
    build)
        build
        ;;
    run)
        run
        ;;
    test)
        test
        ;;
    *)
        echo "Usage: $0 {build|run|test}"
        exit 1
        ;;
esac

exit 0
