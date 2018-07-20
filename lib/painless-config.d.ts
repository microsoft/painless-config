declare let config: IPainlessConfig;
declare module "painless-config" {
    export default config;
}

interface IPainlessConfig {
    get(name: string): string;
    all(): Map<string, string>;
}
