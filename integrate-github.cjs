const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

// Configuration
const dir = __dirname;
const url = 'https://github.com/caslusiqueira2-hue/portuguestopado.git';
const branch = 'main';
const token = process.env.GITHUB_TOKEN;

async function integrate() {
    console.log('--- Starting GitHub Integration ---');

    // Initialize Repo
    console.log('1. Initializing repository...');
    try {
        await git.init({ fs, dir });
        console.log('   Done.');
    } catch (err) {
        console.error('   Error initializing repo:', err.message);
    }

    // Add Files
    console.log('2. Adding files to staging (respecting .gitignore)...');
    try {
        const status = await git.statusMatrix({ fs, dir });
        const filesToAdd = status
            .filter(row => row[2] !== row[1] || row[3] !== row[2]) // row[1]: head, row[2]: workdir, row[3]: stage. If workdir != head, it's modified or new.
            .map(row => row[0]);

        for (const file of filesToAdd) {
            if (file.startsWith('node_modules') || file.startsWith('.git') || file === 'integrate-github.cjs' || file === 'integrate-github.js') continue;
            await git.add({ fs, dir, filepath: file });
        }
        console.log(`   Staged ${filesToAdd.length} files.`);
    } catch (err) {
        console.error('   Error adding files:', err.message);
    }

    // Initial Commit
    console.log('3. Creating initial commit...');
    try {
        const sha = await git.commit({
            fs,
            dir,
            author: {
                name: 'Kenedy (via Antigravity)',
                email: 'kenedy@antigravity.ai',
            },
            message: 'Initial commit from IFRN platform copy',
        });
        console.log('   Commit created:', sha);
    } catch (err) {
        if (err.message.includes('No files to add')) {
            console.log('   (Nothing to commit, maybe already committed?)');
        } else {
            console.error('   Error committing:', err.message);
        }
    }

    // Push
    if (token) {
        console.log('4. Pushing to GitHub...');
        try {
            const pushResult = await git.push({
                fs,
                http,
                dir,
                remote: 'origin',
                ref: branch,
                onAuth: () => ({ username: token }),
                url: url
            });
            console.log('   Push successful!');
        } catch (err) {
            console.error('   Error pushing:', err.message);
        }
    } else {
        console.log('4. Skipping push (no GITHUB_TOKEN provided).');
        console.log('   To push, run: $env:GITHUB_TOKEN="your_token"; node integrate-github.cjs');
    }

    console.log('--- Integration Step Complete ---');
}

integrate().catch(err => console.error('Fatal error:', err));
