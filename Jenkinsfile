pipeline {
    agent any

    environment{
        imageName = ""
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
                 script{
                     imageName = docker.build "biswa2015/cqcmp_fe:latest"
                 }
            }
        }
        stage('Push image to docker hub'){
            steps {
                script{
                    docker.withRegistry('', 'dockerhub-cred-biswa') {
                       imageName.push()
                    }
                }
            }
        }
        /*stage('Pull image from docker hub'){
            steps {
                ansiblePlaybook colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'inventory', playbook: 'playbook.yml'
            }
        }*/
    }
}
