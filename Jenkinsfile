@Library('ised-cicd-lib') _

pipeline {
    agent {
        label 'nodejs'
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
                    branch 'development'
                }
            }
            steps{
                sh script: """
                    unset NPM_CONFIG_PREFIX && source $NVM_DIR/nvm.sh
                    nvm install 14.15.1
                    nvm alias default 14.15.1
                    npm i yarn -g
                """, label: 'Setting up proper node.js version'
                sh script: """
                    unset NPM_CONFIG_PREFIX && source $NVM_DIR/nvm.sh
                    (cd $FRONTEND_DIR && yarn install --production=false)
                """, label: 'Installing packages'
            }
        }

        stage('linter') {
            when {
                 not {
                    branch 'development'
                }
            }
            parallel {
                stage('i18n-linting') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            // sh script: 'npm init -y && npm i lodash', label: 'Setup i18n linting dummy project'
                            sh script: 'yarn i18:validate', label: 'Validating i18n files'
                        }
                    }
                }        

                // stage('frontend-linting') {
                //     steps {
                //         dir("${FRONTEND_DIR}") {
                //             sh script: """
                //                 unset NPM_CONFIG_PREFIX && source $NVM_DIR/nvm.sh
                //                 yarn lint
                //             """, label: 'Linting frontend'
                //         }
                //     }
                // }    

                // stage('backend-linting') {
                //     steps {
                //         dir("${BACKEND_DIR}") {
                //             sh script: """
                //                 unset NPM_CONFIG_PREFIX && source $NVM_DIR/nvm.sh
                //                 yarn lint
                //             """, label: 'Linting backend'
                //         }
                //     }
                // }
            }
        }

        // stage('backend-test') {
        //     when {
        //          not {
        //             branch 'development'
        //         }
        //     }
        //     steps {
        //         dir("${BACKEND_DIR}") {
        //             sh script: """
        //                 unset NPM_CONFIG_PREFIX && source $NVM_DIR/nvm.sh
        //                 yarn generate
        //                 yarn test
        //             """, label: 'Testing backend'
        //             archiveArtifacts artifacts: 'tests/coverage/'
        //         }
        //     }
        // }
        

        stage('build') {
            when { branch 'development' }
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
