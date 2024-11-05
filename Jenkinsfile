pipeline {
    agent any
    
    environment {
        BLUE_ENV = "blue"
        GREEN_ENV = "green"
        DOCKER_IMAGE = "<your-dockerhub-username>/blue-green-deployment-app:latest"
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/AbhishekHerbertSamuel/blue-green-deployment-app.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker login -u <your-dockerhub-username> -p <your-password>'
                    sh 'docker push ${DOCKER_IMAGE}'
                }
            }
        }
        
        stage('Deploy to Blue Environment') {
            steps {
                script {
                    sh '''
                    docker stop ${BLUE_ENV} || true
                    docker rm ${BLUE_ENV} || true
                    docker run -d --name ${BLUE_ENV} -p 3001:3000 ${DOCKER_IMAGE}
                    '''
                }
            }
        }
        
        stage('Switch Traffic to Blue') {
            steps {
                script {
                    echo 'Switching traffic to Blue environment...'
                }
            }
        }
        
        stage('Deploy to Green Environment') {
            steps {
                script {
                    sh '''
                    docker stop ${GREEN_ENV} || true
                    docker rm ${GREEN_ENV} || true
                    docker run -d --name ${GREEN_ENV} -p 3002:3000 ${DOCKER_IMAGE}
                    '''
                }
            }
        }
        
        stage('Switch Traffic to Green') {
            steps {
                script {
                    echo 'Switching traffic to Green environment...'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Deployment complete!'
        }
    }
}

