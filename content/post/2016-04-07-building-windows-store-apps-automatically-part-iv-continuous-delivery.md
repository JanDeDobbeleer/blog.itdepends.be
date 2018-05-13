---
categories:
- automation
date: 2016-04-07T00:00:00Z
description: After learning how to build our apps using psake, what else do we need
  to continuously deliver?
tags:
- app
- bamboo
- cd
- ci
- cli
- command line
- continuous
- delivery
- integration
- jenkins
- make
- makefile
- powershell
- psake
- store
- uwp
- windows
title: Building Windows Store apps automatically - Part IV - Continuous Delivery
url: /building-windows-store-apps-automatically-part-iv-continuous-delivery
---

> This is Part IV of "Building Windows Store apps automatically", in case you haven't read <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-i-introduction" target="_blank">Part I</a>, <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-ii-building" target="_blank">Part II</a> or <a href="http://www.herebedragons.io/building-windows-store-apps-automatically-part-iii-continuous-integration" target="_blank">Part III</a> yet, please do so before reading this post. The source code of this series can be found on Github.
>
> <a class="github_link" href="https://github.com/JanJoris/psake-example" target="_blank" >Source code</a>

Everybody knows it is a <a href="http://www.urbandictionary.com/define.php?term=pita" target="_blank">PITA</a> how slow Visual Studio is when it comes to getting it to build a Store package. It's not the building itself that annoys me, it's going through all the steps to login, select the app, check the configuration and *then* start building. To remedy this we can edit those files ourselves and **save a lot of time**. So, even when you are not planning to use this in an automated solution, building with the psakefile can still make your life more comfortable.

The first file we have to edit is the `Package.appxmanifest` file. This contains the version number, app display name, app name and product id. Now that we have flights for UWP apps in the store I can imagine the use case for editing anything other than the version number is rather limited for pure UWP apps. But due to the fact that most of us will have to **maintain both the 8.1 and 10** versions, this is still showcased. If you want to distribute a test version of your app, it still requires a separate "Beta" app in the Store for 8.1, so you will need to associate the same app with two Store apps. This task will allow you to do so.

Secondly, we tackle the `Package.StoreAssociation.xml` file. This holds the app and display name. Beware though, when you edit the `ReservedName` property and add something new, this will display the app in the Store with that new name. You will have to publish another, new version with the old name before you can delete the other name from within the Store interface.

    Task Version -Depends VerifyVersionProperties {
        $appx_file_path = Get-ProjectFilePath -projectName $project_name -fileName 'Package.appxmanifest'
        $XMLfile = Get-ProjectFileXmlObject -filePath $appx_file_path
        $version = $XMLfile.Package.Identity.Version
        Write-Host -Object "Current version number = $version"
        $major = $version.Split('.')[0]
        $minor = $version.Split('.')[1]
        $release = Get-Date -UFormat %j%H
        $buildNumber = 0
        $version = "$major.$minor.$release.$buildNumber"
        Write-Host -Object "Updating appxmanifest file with version number $version" -ForegroundColor DarkCyan
    
        #Save the new version number
        $XMLfile.Package.Identity.Version = $version
        $XMLfile.Package.Identity.Name = $app_name
        $XMLfile.Package.Applications.Application.VisualElements.DisplayName = $display_name
        $XMLfile.Package.PhoneIdentity.PhoneProductId = $product_id
        $XMLfile.Package.Properties.DisplayName = $display_name
    
        # set the file as read write and save
        Set-ItemProperty ($appx_file_path) -Name IsReadOnly -Value $false
        $XMLfile.save($appx_file_path)
        Write-Host -Object 'Updated the appxmanifest file' -ForegroundColor DarkCyan
    
        $association_file_path = Get-ProjectFilePath -projectName $project_name -fileName 'Package.StoreAssociation.xml'
        $XMLfile = Get-ProjectFileXmlObject -filePath $association_file_path
        $XMLfile.StoreAssociation.ProductReservedInfo.MainPackageIdentityName = $app_name
        $XMLfile.StoreAssociation.ProductReservedInfo.ReservedNames.ReservedName = $display_name
    
        # set the file as read write and save
        Set-ItemProperty ($association_file_path) -Name IsReadOnly -Value $false
        $XMLfile.save($association_file_path)
        Write-Host -Object 'Updated the store association file' -ForegroundColor DarkCyan
    }
    

One of the annoyers and difference with 8.1 apps, is that the last version number has to be 0. I could write another paragraph indicating why **this is a silly feature** but I'm not going to bore you. Instead, I moved the build up by one position. The logic is pretty straightforward, it takes the day number and adds the hour. This way the max number of digits will be 5, which is the limit we have. It also implies a version number (for instance 2.2) should not be used for more than 1 year or you will create same version (or go lower after new years eve). There is no perfect numbering system with only 5 digits. I chose the lesser of two evils. Ideally, MS would allow a nicer way of versioning.

Now that we can do everything to setup continuous delivery, we can edit the `flavors.ps1` file to hold the different versions of the app. To simplify the CI and CD builds I added 2 more Tasks to the `psakefile.ps1`.

    Task CI -Depends Build, Test, Validate    
    Task CD -Depends Version, Build
    

With these we can edit the `flavors.ps1` file to look like this:

    #requires -Version 1
    Task Default -Depends ProductionCI
    
    Task ProductionCI {
      Invoke-psake psakefile.ps1 CI -properties @{
        'solutionFileName' = 'Dummy.sln'
        'build_platform' = 'x86'
        'configuration'  = 'Release'
        'project_name'   = 'Dummy.UWP.Test'
      }
    }
    
    Task ProductionCD {
      Invoke-psake psakefile.ps1 CD -properties @{
        'solutionFileName' = 'Dummy.sln'
        'build_platform' = 'ARM'
        'configuration'  = 'Release'
        'project_name'   = 'Dummy.UWP'
        'app_name'       = 'Dummy'
        'product_id'     = '5f99e69a-9f7b-88e4-86aa-c0f67dc5484f'
        'display_name'   = 'Dummy'
      }
    }
    
    Task BetaCD {
      Invoke-psake psakefile.ps1 CD -properties @{
        'solutionFileName' = 'Dummy.sln'
        'build_platform' = 'ARM'
        'configuration'  = 'Release'
        'project_name'   = 'Dummy.UWP'
        'app_name'       = 'Dummy Beta'
        'product_id'     = '5f99e69a-9f7b-88e4-86aa-c0f67dc5484f'
        'display_name'   = 'Dummy Beta'
      }
    }
    

To run one of the builds you can use the same syntax we used for tasks in the `psakefile.ps1`:

    .\psake.ps1 .\flavors.ps1 ProductionCI
    

We happily went from one line with a lot of properties, to just 3 parameters. This is what you can use in your CI/CD tool or if you feel like running the tests yourself before pushing your code. I hope you learned something from reading this. Any feedback you have is greatly appreciated, maybe you have a situation that requires something else, or you simply do not agree with what I've created. Either way, **get in touch with me**, I won't bite. Hard.