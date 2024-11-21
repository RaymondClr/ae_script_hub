import * as _ from "soil-ts";

const context = this;
const appPath = _.getAppPath();
const supportPath = _.trimPathRight(appPath, 1);
const scriptPath = _.createPath(supportPath, "Scripts");
const scriptUIPath = _.createPath(scriptPath, "ScriptUI Panels");
const SCRIPT_PATHS_DEFAULT = [scriptPath, scriptUIPath];

runScript();

function runScript() {
    const unknownFiles = _.flatMap(SCRIPT_PATHS_DEFAULT, function (path) {
        return _.mapFiles(path, (file) => {
            return file.alias ? file.resolve() : file;
        });
    });
    const scriptFiles = _.filter(unknownFiles, _.isScriptFile);
    const scriptNames = _.map(scriptFiles, _.getPlainFileName);
    const container = initMainContainer(context, "");
    (container as Window).onResize = () => {
        container.layout.resize();
    };
    container.alignChildren = ["fill", "fill"];
    container.margins = 5;
    const lisbox = container.add("listbox", undefined, undefined, { multiselect: true });
    lisbox.preferredSize = [300, 500] as Dimension;
    if (_.isWindow(container)) {
        container.show();
    } else {
        container.layout.layout(true);
    }
    _.forEach(scriptNames, (name, index) => {
        const item = lisbox.add("item", name);
        const colorValue = _.reduce(name.split(""), (acc, cur) => acc + cur.charCodeAt(0), 0) % 256;
        item.image = _.newSolidImage([15, 15], [colorValue, 255 - colorValue, (colorValue * 2) % 256] as [number, number, number]);
    });
    lisbox.onDoubleClick = function () {
        const selection = this.selection as unknown as ListItem[] | null;
        if (_.isArray(selection)) {
            const index = selection[0].index;
            $.evalFile(scriptFiles[index]);
        }
    };
}

function initMainContainer(context: unknown, title: string) {
    return _.isPanel(context) ? context : baseCreatePalette(title);
}

function baseCreatePalette(title: string) {
    return new Window("palette", title, undefined, { resizeable: true });
}
