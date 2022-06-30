#
# Copyright 2020 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Startup profile that configures the PowerShell environment.

function prompt {
    # If the gcloud sentinal file exists, that means a configuration changed.
    # The file will not exists until `gcloud config set` is called.
    if (Test-Path $env:CLOUDSDK_CONFIG/config_sentinel) {
        $ACTIVE_CONFIG = Get-Content $env:CLOUDSDK_CONFIG/active_config
        Get-Content "$env:CLOUDSDK_CONFIG/configurations/config_$ACTIVE_CONFIG" | foreach-object -begin {$h=@{}} -process { $k = [regex]::split($_,'='); if(($k[0].CompareTo("") -ne 0) -and ($k[0].StartsWith("[") -ne $True)) { $h.Add($k[0].trim(), $k[1].trim()) } }
        $env:DEVSHELL_PROJECT_ID=$h.Get_Item("project")
        $env:GOOGLE_CLOUD_PROJECT=$h.Get_Item("project")

        # rm so we will not read the config each time.
        rm -f $CLOUDSDK_CONFIG/config_sentinel
    }
}