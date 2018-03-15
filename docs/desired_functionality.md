RECORD:

1. Trust should create a folder for the website and another one for a lambda
2. it should ask the user for project name:

      trust create <project_name>
      // or
      trust create
	[*] Please specify a project name: _

3. It should require the AWS credentials to be present under ~/.aws/
4. if not it should ask the user to add the configuration under ~/.trust/

      aws_credentials_path:/user/local/bob/.aws/

5. Other commands:
   
    
    trust deploy
    trust test
    trust add <module>
    
6. It should deploy to codecommit and then deploy the site to S3 bucket and the lamda on AWS + API Gateway
