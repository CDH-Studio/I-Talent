@Library('ised-cicd-lib') _

pipeline {
    agent {
        label '!container-utils'
        docker {
            image 'node:12.18.3-alpine3.11'
            args '-p 3000:3000'
        }
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
        stage('install-packages') {
            parallel {
                stage('backend') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            sh 'npm install -g yarn'
                            sh 'yarn install --production'
                        }
                    }
                }
                stage('frontend') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            sh 'npm install -g yarn'
                            sh 'yarn install --production'
                        }
                    }
                }
            }
        }
        stage('Linter-and-testing') {
            parallel {
                stage('backend-lint') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            sh 'yarn lint'
                        }
                    }
                }
                stage('frontend-lint') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            sh 'yarn lint'
                        }
                    }
                }
                stage('frontend-i18') {
                    steps {
                        dir("${FRONTEND_DIR_I18}") {
                            sh 'node check'
                        }
                    }
                }
            }
        }
        stage('build') {
            parallel {
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
    }
}
