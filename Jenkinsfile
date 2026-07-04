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
                dir('docktask') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Application') {
            steps {
                dir('docktask') {
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('docktask') {
                    bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
                }
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'passwd',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }
    }

    post {

        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Build failed. Reverting latest commit locally...'

            bat '''
                git config user.name "Jenkins"
                git config user.email "jenkins@local"
                git revert HEAD --no-edit
            '''
        }

        always {
            bat 'docker logout'
            cleanWs()
        }
    }
}
