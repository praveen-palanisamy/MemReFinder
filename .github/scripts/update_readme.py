#!/usr/bin/env python
import os
import re
from github import Github

GITHUB_TOKEN = os.environ["GITHUB_TOKEN"]
REPO_NAME = os.environ["GITHUB_ACTION_REPOSITORY"]

g = Github(GITHUB_TOKEN)
repo = g.get_repo(REPO_NAME)
latest_release = repo.get_latest_release()

assets = latest_release.get_assets()
asset_links = {
    "windows": "",
    "mac": "",
    "linux_deb": "",
    "linux_appimage": "",
    "linux_rpm": "",
}

for asset in assets:
    if asset.name.endswith(".exe"):
        asset_links["windows"] = asset.browser_download_url
    elif asset.name.endswith(".dmg"):
        asset_links["mac"] = asset.browser_download_url
    elif asset.name.endswith(".deb"):
        asset_links["linux_deb"] = asset.browser_download_url
    elif asset.name.endswith(".AppImage"):
        asset_links["linux_appimage"] = asset.browser_download_url
    elif asset.name.endswith(".rpm"):
        asset_links["linux_rpm"] = asset.browser_download_url

with open("README.md", "r") as f:
    readme_content = f.read()

new_readme_content = re.sub(
    r"<!-- ASSETS_START -->(.|\n)*?<!-- ASSETS_END -->",
    f"<!-- ASSETS_START -->\n"
    f"### Download links\n\n"
    f"| Platform       | Download |\n"
    f"| -------------- | -------- |\n"
    f"| Windows        | [Download .exe]({asset_links['windows']}) |\n"
    f"| Mac            | [Download .dmg]({asset_links['mac']}) |\n"
    f"| Linux          | |\n"
    f"| &emsp;Debian/Ubuntu | [Download .deb]({asset_links['linux_deb']}) |\n"
    f"| &emsp;AppImage      | [Download .appimage]({asset_links['linux_appimage']}) |\n"
    f"| &emsp;RPM-based     | [Download .rpm]({asset_links['linux_rpm']}) |\n"
    f"<!-- ASSETS_END -->",
    readme_content,
)

with open("README.md", "w") as f:
    f.write(new_readme_content)
