pipeline {
    agent any

    environment {
        IMAGE_NAME = "dhanushrajan/docktask"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Dhanushrajan123/docktask.git'
            }
        }

        stage('Install Dependencies') {
    steps {
        sh '''
        cd docktask
        npm install
        '''
    }
}

        stage('Build Application') {
            steps {
                sh '''
                if npm run | grep -q "build"; then
                    npm run build
                else
                    echo "No build script found. Skipping build stage."
                fi
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'passwd',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
            }
        }
    }
 post {
    failure {
        echo 'Build failed.'

        sh '''
        git config user.name "Jenkins"
        git config user.email "jenkins@local"

        git revert HEAD --no-edit || true

        echo "Latest commit reverted locally."
        '''
    }
}
}   
