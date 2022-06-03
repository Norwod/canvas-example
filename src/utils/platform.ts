import Router, { Router as RouterType, useRouter } from 'next/router';

export const getPlatformByPath = (asPath: string) => {
    const [, platform] = asPath.match(/@(\w+)/) ?? [];

    return {
        platform: platform as 'sberbox' | 'mobile' | 'portal' | undefined,
        isSberbox: platform === 'sberbox',
        isPortal: platform === 'portal',
        isMobile: platform === 'mobile',
    };
};

// работает корректно для пре-рендера
export const usePlatform = (serverRouter?: RouterType | { asPath: string }) => {
    const { asPath } = useRouter() ?? serverRouter;

    return getPlatformByPath(asPath);
};

// вызывать только на клиенте
export const getPlatformNotInComponent = () => {
    const { asPath } = Router;

    return getPlatformByPath(asPath);
};