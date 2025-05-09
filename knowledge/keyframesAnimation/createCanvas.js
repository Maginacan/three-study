export default function createCanvas (text) {
    const canvas = document.createElement('canvas');
    const w = canvas.width - 80;
    const h = canvas.height - 50;
    const c = canvas.getContext('2d');
    c.fillStyle = '#fff';
    c.fillRect(0, 0, w, h);
    c.fillStyle = "green";
    c.fillRect(10, 10, w - 20, h - 20);
    c.translate(w / 2, h / 2);
    c.fillStyle = "#ffffff";
    c.font = "normal 24px 微软雅黑";
    c.textBaseline = "middle";
    c.textAlign = "center";
    c.fillText(text, 0, 0);
    return canvas;
}