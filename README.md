```diff
! This paper is under review on the experimental track of the Journal of Visualization and Interaction.
Authors: @picorana
OC: Chat Wacharamanotham
AE: Lane Harrison
R1: mjwybrow
R2: eelir
R3: gdrawing-anon-reviewer
```

# GLaDOS: Graph Layout algorithm Datasets for Open Science

This paper is under submission to the the [experimental track](https://www.journalovi.org/submit.html#experimental) at JoVI.

Papers for this track are written in [Quarto](https://quarto.org/) which is an open source publishing format that supports inline code, including languages like R, Python, Julia, and JavaScript (via Observable Notebook).

```diff
!  Only edit .qmd files! The other files are generated from this.
```

See <https://osf.io/j7ucv/> for more details on the related publication and supplemental materials.

## Setup instructions

1. Clone the repo.

   * On Windows, we currently have paths in the data directory that are too long for git to handle. This prevents cloning. To avoid this problem, run `git config --system core.longpaths true` with administrator rights.

2. `CD` to the repo directory. Create and activate a virtual environment for this project. You may need to modify the code you use depending on what Python you have installed and how your machine is configured.
3. Run the setup commands below.

    * On macOS, Linux, or Windows Subsystem for Linux, run these three commands *separately* in case there are errors:

        ```bash
        python3 -m venv env
        ```

        ```bash
        source env/bin/activate
        ```

        ```bash
        which python
        ```

        If you don't have `venv` installed on Ubuntu, you can run this to install it:

        ```bash
        apt-get install python3-virtualenv
        ```

    * On Windows, run these three commands *separately* in case there are errors:

        ```bash
        python -m venv env
        ```

        ```bash
        .\env\Scripts\activate.bat
        ```

        ```bash
        where.exe python
        ```

    Check the path(s) provided by `which python` or `where.exe python`—the first one listed *should* be inside the `env` folder you just created.

4. Install necessary packages.

    ```bash
    python -m pip install -r requirements-simple.txt
    ```

    If you want to install the exact versions used by the authors, run instead

    ```bash
    python -m pip install -r requirements-wsl-ubuntu.txt
    ```

    which containes the pinned package list generated by running `python -m pip freeze > requirements-pinned.txt` in the virtual environment.

    The install may take a few minutes.

    If you don't have Quarto installed, install it. On Ubuntu, you can do this by running:

    ```bash
    curl -s https://api.github.com/repos/quarto-dev/quarto-cli/releases/latest | grep "browser_download_url.*amd64.deb" | cut -d : -f 2,3 | tr -d \" | wget -qi -
    ```

    then:

    ```bash
    sudo dpkg -i *amd64.deb
    ```

## Run instructions

Follow the instructions at <https://quarto.org/docs/get-started/hello/>. If you are using the VSCode Quarto extension and WSL, ensure you start VSCode from the repository directory by running `code .` at the WSL terminal.

For example, to preview the website run

```bash
quarto preview --no-browser --no-watch-inputs
```

and to publish it to GitHub pages use

```bash
quarto publish --no-prompt gh-pages
```

While you're editing, it is helpful to periodically delete the `_site` folder and regenerate it to ensure all changes are used and that warnings don't show up:

```bash
rm -rf _site
```
