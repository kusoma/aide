# aide
Azusa Pacific University Senior Capstone Project

Naming Convention Style Guide
* camelCase
* for UI components, start with the general name of the UI component

  ```shell
  var btnSignIn
  var lblCourseName
  var lblCourseTitle
  ```

Git Style Guide
## Branches

* Choose *short* and *descriptive* names:

  ```shell
  # good
  $ git checkout -b oauth-migration

  # bad - too vague
  $ git checkout -b login_fix
  ```

* Use lowercase in branch names. External ticket identifiers with uppercase
  letters are a valid exception. Use *hyphens* to separate words.

  ```shell
  $ git checkout -b new-feature      # good
  $ git checkout -b T321-new-feature # good (Phabricator task id)
  $ git checkout -b New_Feature      # bad
  ```
