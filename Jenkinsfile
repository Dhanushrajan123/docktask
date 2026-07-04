pipeline {
    agent any

    environment {
        IMAGE_NAME = "dhanushrajan/docktask"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Dhanushrajan123/docktask.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('docktask') {
                    bat 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Build App') {
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

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'passwd',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat '''
                    echo %PASS% | docker login -u %USER% --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                bat 'docker push %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }
    }

    post {
        success {
            echo 'Build Successful 🚀'
        }

        failure {
            echo 'Build Failed ❌ (check logs)'
        }

        always {
            bat 'docker logout || exit 0'
            cleanWs()
        }
    }
}
