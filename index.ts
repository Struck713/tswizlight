
import Bun from "bun";

export interface Color {
    r: number,
    g: number,
    b: number,
    dimming: number
}

type BunSocketDataFunction<T extends keyof Bun.BinaryTypeList> = (socket: Bun.udp.Socket<T>, data: Buffer, port: number, address: string) => Promise<void> | void;

export class Light {

    constructor(private ip: string, private port: number = 38899, private id: number = 1) {};

    private init = async (data?: BunSocketDataFunction<"buffer">) => Bun.udpSocket({ socket: { data }});
    
    private send = async (data: any) => {
        const socket = await this.init();
        socket.send(JSON.stringify(data), this.port, this.ip);
        socket.close();
    }
    
    private sendAndRecieve = async (data: any) => new Promise(async (res, _) => {
        const socket = await this.init((socket: Bun.udp.Socket<"buffer">, data: Buffer, port: number, address: string) => {
            socket.close();
            res(data.toString());
        });
        socket.send(JSON.stringify(data), this.port, this.ip);
    });

    setColor = (color: Color) => this.send({ id: this.id, method: "setPilot", params: color });
    setState = (state: boolean) => this.send({ method: "setState", params: { state }});
    getInfo = () => this.sendAndRecieve({method: "getPilot", params: {}});

}