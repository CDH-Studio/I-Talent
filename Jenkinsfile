@Library('ised-cicd-lib') _

pipeline {
    agent {
        label 'nodejs'
    }
    
    tools {
        nodejs 'nodejs-16.8.0'
    }

    options {
        timeout(time: 30) 
        disableConcurrentBuilds()
    }

    environment {
        // Global Vars
        BACKEND_IMAGE_NAME = 'dsd-italent-backend'
        FRONTEND_IMAGE_NAME = 'dsd-italent-frontend'
        BACKEND_DIR = 'services/backend'
        FRONTEND_DIR = 'services/frontend'
        FRONTEND_DIR_I18N = 'services/frontend/src/i18n'
        NODE_ENV = 'production'
    }

    stages {
        stage('configure-node') {
            when {
                 not {
                    branch 'dev'
                }
            }

            steps{
                sh script: """
                    node --version
                    whereis npm
                    npm install -g npm
                    npm --version
                    npm i yarn -g
                    (cd $FRONTEND_DIR && yarn install --production=false)
                    (cd $BACKEND_DIR && yarn install --production=false)
                """, label: 'Installing packages'
            }
        }
        stage('linter') {
            when {
                 not {
                    branch 'dev'
                }
            }
            parallel {
                stage('i18n-linting') {
                   steps {
                        dir("${FRONTEND_DIR}") {
                            sh script: """
                                yarn i18n:validate
                            """, label: 'Validating i18n files'

                        }
                    }
                }        

                stage('frontend-linting') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            sh script: """
                                yarn lint
                            """, label: 'Linting frontend'
                        }
                    }
                }    

                stage('backend-linting') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            sh script: """
                                yarn lint
                            """, label: 'Linting backend'
                        }
                    }
                }
            }
        }

        stage('backend-test') {
            when {
                 not {
                    branch 'dev'
                }
            }
            steps {
                dir("${BACKEND_DIR}") {
                    sh script: """
                        yarn generate
                        yarn test
                    """, label: 'Testing backend'
                    archiveArtifacts artifacts: 'tests/coverage/'
                }
            }
        }
        
        stage('build-backend') {
            when {
                branch 'dev'
            }
            steps {
                dir("${BACKEND_DIR}") {
                    script {
                                builder.buildApp(BACKEND_IMAGE_NAME)
                            }
                }
            }
        }
        stage('build-frontend') {
            when {
                branch 'dev'
            }
            steps {
                dir("${FRONTEND_DIR}") {
                    script {
                        builder.buildApp(FRONTEND_IMAGE_NAME)
                    }
                }
            }
        }
    }
    post('workspace cleanup') {
        always {
            deleteDir();
        }
    }
}
