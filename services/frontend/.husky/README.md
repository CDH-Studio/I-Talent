# installation instructions

    - cd into services/frontend on your local machine and run yarn install
    - If you get the following error "pre-commit hook not executable" run the following from root dir:
        - chmod ug+x services/frontend/.husky/*
        - chmod ug+x .git/hooks/*
