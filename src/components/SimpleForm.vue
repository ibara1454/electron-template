<template>
    <form action="" method="get">
        <div class="form-group">

        </div>
        <div class="form-group">
            <button v-on:click="createWindow">Click Me!</button>
        </div>
    </form>
</template>

<script>
import electron from 'electron';
import path from 'path';

const BrowserWindow = electron.remote.BrowserWindow;

export default {
    methods: {
        createWindow: function(event) {
            const window = new BrowserWindow({
                width: 800,
                height: 600
            });
            window.loadURL(path.join('file://', __dirname, 'sub.html'));
        }
    }
}
</script>

<style lang="stylus">
</style>
