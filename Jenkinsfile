pipeline {
    agent any
    stages {
        stage('check') {
            steps {
                sh 'npm --version'
            }
        }
        stage('test') {
            steps {
                echo 'Step test'
            }
        }
        stage('integration test') {
            steps {
                echo 'Step IT'
            }
        }
        stage('build') {
            steps {
                echo 'npm start'
            }
        }
        stage('deploy') {
            steps {
                echo 'Step deploy'
                echo 'Ready to deploy'
            }
        }
    }
}