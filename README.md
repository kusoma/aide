# aide
Azusa Pacific University Senior Capstone Project

## Git Guide
### Testing
#### Creating your own test branch
```shell
$ git checkout develop
$ git pull
$ git checkout -b test-name # name should be your name
```
##### Do NOT merge into test, merge into your own test branch

#### Make sure the test branch is always up to date
```shell
$ git checkout develop
$ git pull
$ git checkout test-name
$ git merge origin/develop
$ git push
```

### Creating a branch
  ```shell
  $ git checkout develop
  $ git pull
  $ git checkout -b feature/001-login-screen
  ```

### Testing a branch
  ```shell
  $ git checkout test-name
  $ git merge origin/feature/001-login-screen # Begin to test the feature that was merged
  ```
  
### Merging a branch to develop
#### YOU DON'T
#### You pull from the develop and test on your own branch
#### Then submit a pull request
1. Pull from develop to make sure your branch has the latest code
```shell
$ git checkout develop
$ git pull
```
2. Merge develop branch into test branch
```shell
$ git checkout test-name
$ git merge develop
```

3. Merge feature into test branch
```shell 
$ git merge feature/###-branch-name
```

4. Test that it runs and everything works
5. Submit pull request
