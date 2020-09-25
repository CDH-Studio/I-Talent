@Library('ised-cicd-lib') _

pipeline {
    agent {
        label 'nodejs'
    }

    options {
        disableConcurrentBuilds()
    }

    environment {
        // GLobal Vars
        BACKEND_IMAGE_NAME = 'dsd-italent-backend'
        FRONTEND_IMAGE_NAME = 'dsd-italent-frontend'
        BACKEND_DIR = 'services/backend'
        FRONTEND_DIR = 'services/frontend-v3'
        FRONTEND_DIR_I18 = 'services/frontend-v3/src/i18n'
        NODE_ENV = 'production'
    }

    stages {

        stage('i18-check') {
            steps {
                dir("${FRONTEND_DIR_I18}") {
                    sh 'yarn init -y'
                    sh 'yarn add lodash'
                    sh 'node check'
                }
            }
        }

        stage('Linting') {
            parallel {
                // stage('backend') {
                //     steps {
                //         dir("${BACKEND_DIR}") {
                //             sh 'yarn add eslint'
                //             sh 'yarn add eslint'
                //             sh 'yarn add eslint'
                //             sh 'yarn add eslint'
                            
                //             sh 'npm lint'
                //         }
                //     }
                // }
                stage('frontend') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            sh 'yarn add eslint'
                            sh 'yarn add eslint-config-airbnb'
                            sh 'yarn add eslint-config-prettier'
                            sh 'yarn add eslint-plugin-import'
                            sh 'npm lint'
                        }
                    }
                }

            }
        }

        stage('build-backend') {
            steps {
			    dir("${BACKEND_DIR}") {
                    script {
                        builder.buildApp(BACKEND_IMAGE_NAME)
                    }
                }
            }
        }
        
        stage('build-frontend') {
            steps {
			    dir("${FRONTEND_DIR}") {
                    script {
                        builder.buildApp(FRONTEND_IMAGE_NAME)
                    }
                }
            }
        }
    }
}
