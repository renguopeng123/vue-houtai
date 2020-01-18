pipeline {
    agent any

    environment {
        repo = "registry.ecloud.work"
        tag = "v0.1.${BUILD_NUMBER}"
        imageName = "gwcloud/ecloud-bpm-ui-new:${tag}"
    }
    tools {
         nodejs 'node-v8.11.2'
    }


    stages {
        stage('check out') {
            steps {
                git branch: '1.x', credentialsId: '0afa4ce7-6007-43bd-9b44-be880905b5c9', url: 'http://61.135.24.220:44450/gwssi-bpm/bpm-manager-console-ui.git'
            }
        }
        
        stage('build') {
          steps {
            sh 'npm install --unsafe-perm'
            sh 'npm run build'
          }
        }

        stage('build images') {
            steps {
                script {
                    docker.withRegistry("https://${repo}","registry-hub-credentials") {
                        docker.build("${imageName}",'.').push()
                    }
                }
            }
        }
        stage('deploy') {
            steps {
                 sh "kubectl --kubeconfig /jenkins/.kube/config set image -n oa deployment/ecloud-bpm-ui-new ecloud-bpm-ui-new=${repo}/${imageName}"
                //sleep time: 1, unit: 'DAYS'
            }
        }
    }
}