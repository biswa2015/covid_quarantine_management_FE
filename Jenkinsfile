pipeline {
    agent any

    environment{
        DOCKERHUB_CREDENTIALS=credentials('docker-cred-biswa')
    }

    stages {
        stage('Clone project') {
            steps {
                git 'https://github.com/biswa2015/covid_quarantine_management_FE.git'
                echo 'Project is cloned successfully'
            }
        }
        stage('Build'){
            steps {
                sh 'npm install'
                echo 'npm build completed'
            }
        }
        // stage('Test'){
        //     steps {
        //         sh 'npm test'
        //         echo 'Testing completed'
        //     }
        // }
        stage('Build image'){
             steps {
                echo 'creating docker  image'
                sh 'docker build -t cqcmp_fe:latest .'
                echo 'docker image created'
            }
        }
        stage('Push image to docker hub'){
            steps {
                echo 'docker tag'
                sh 'docker tag cqcmp_fe biswa2015/cqcmp_fe:latest'
                echo 'docker login'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                echo 'Pushing image to hub'
                sh 'docker push biswa2015/cqcmp_fe'
                echo 'docker logout'
                sh 'docker logout'
            }
        }
        /*stage('Pull image from docker hub'){
            steps {
                ansiblePlaybook colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'inventory', playbook: 'playbook.yml'
            }
        }*/
    }
}
