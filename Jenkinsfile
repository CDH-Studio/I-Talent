@Library('ised-cicd-lib') _

pipeline {
    agent {
        label '!container-utils'
    }

    options {
        disableConcurrentBuilds()
    }

    environment {
        // GLobal Vars
        BACKEND_IMAGE_NAME = "dsd-italent-backend"
        FRONTEND_IMAGE_NAME = "dsd-italent-frontend"
        BACKEND_DIR = "backend"
        FRONTEND_DIR = "frontend-v3"
    }

    stages {
        stage('build') {
            steps {
			    dir(BACKEND_DIR) {
                    script {
                        builder.buildApp(BACKEND_IMAGE_NAME)
                    }
                }

			    dir(FRONTEND_DIR) {
                    script {
                        builder.buildApp(FRONTEND_IMAGE_NAME)
                    }
                }
            }
        }
    }
}
