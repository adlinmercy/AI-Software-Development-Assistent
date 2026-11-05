const { app, BrowserWindow, dialog, Menu } = require("electron");
const path = require("path");
const { spawn, execFileSync } = require("child_process");
const fs = require("fs");
const http = require("http");

let mainWindow;
let backendProcess;

function getBackendPath() {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, "devcore_backend.exe");
    }

    return path.join(
        __dirname,
        "../backend/dist/devcore_backend_test.exe"
    );
}

function startBackend() {
return new Promise((resolve, reject) => {
const backendPath = getBackendPath();

    if (!fs.existsSync(backendPath)) {
        reject(new Error("Backend executable not found: " + backendPath));
        return;
    }

    backendProcess = spawn(backendPath, [], {
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"]
});

backendProcess.stdout.on("data", (data) => {
    console.log("Backend:", data.toString());
});

backendProcess.stderr.on("data", (data) => {
    console.error("Backend error:", data.toString());
});

    let startupError = null;

    backendProcess.once("error", (error) => {
        startupError = error;
    });

    backendProcess.once("exit", (code) => {
        if (code !== null && code !== 0) {
            console.error("Backend exited with code:", code);
        }
    });

    const startTime = Date.now();

    function checkBackend() {
        if (startupError) {
            reject(startupError);
            return;
        }

        if (!backendProcess || backendProcess.exitCode !== null) {
            reject(new Error("Backend stopped unexpectedly."));
            return;
        }

        const request = http.get(
            "http://127.0.0.1:8000/openapi.json",
            (response) => {
                response.resume();

                if (response.statusCode === 200) {
                    resolve();
                } else {
                    retry();
                }
            }
        );

        request.on("error", retry);

        request.setTimeout(1000, () => {
            request.destroy();
        });
    }

    function retry() {
        if (Date.now() - startTime > 30000) {
            reject(new Error("Backend startup timed out."));
            return;
        }

        setTimeout(checkBackend, 500);
    }

    checkBackend();
});


}

function createWindow() {
mainWindow = new BrowserWindow({
width: 1400,
height: 900,
minWidth: 1000,
minHeight: 650,
title: "DevCore AI",
backgroundColor: "#ffffff",

    webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
    }
});

mainWindow.loadFile(
    path.join(__dirname, "../design/login.html")
);

mainWindow.on("closed", () => {
    mainWindow = null;
});

}
app.whenReady().then(async () => {

Menu.setApplicationMenu(null);

try {
    await startBackend();
    createWindow();
} catch (error) {
    dialog.showErrorBox(
        "DevCore AI - Startup Error",
        error.message
    );

    app.quit();
}

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

});

app.on("before-quit", () => {
    if (backendProcess && backendProcess.pid) {
        try {
            if (process.platform === "win32") {
                execFileSync("taskkill", [
                    "/PID",
                    String(backendProcess.pid),
                    "/T",
                    "/F"
                ]);
            } else {
                backendProcess.kill();
            }
        } catch (error) {
            console.log("Backend shutdown:", error.message);
        }

        backendProcess = null;
    }
});

app.on("window-all-closed", () => {
if (process.platform !== "darwin") {
app.quit();
}
});
