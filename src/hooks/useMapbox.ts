import { useEffect, useRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { ArticlesContext } from '../hooks/useArticles';

export const useMapbox = (latitude: number | null, longitude: number | null) => {
    const articles = useContext(ArticlesContext);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (latitude && longitude && mapContainerRef.current) {
            mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [longitude, latitude],
                zoom: 15,
            });

            // 言語変更設定
            const language = new MapboxLanguage();
            map.addControl(language);

            // 拡大・縮小コントロールUI
            map.addControl(new mapboxgl.NavigationControl());

            // 現在位置にピンを立てる
            // new mapboxgl.Marker({ color: '#ccc' }).setLngLat([longitude, latitude]).addTo(map);

            // useContextで取り出してきたAPIデータ
            articles.forEach((article) => {
                const marker = new mapboxgl.Marker({ color: '#4169e1' }).setLngLat([article.longitude, article.latitude]);
                marker.addTo(map);
                const popup = new mapboxgl.Popup({ className: 'custom-popup' }).setHTML(
                    `
                        <h3>
                            ${article.exclusive ? `<span>${article.exclusive}</span><br />` : ''}
                            ${article.title}
                        </h3>
                        ${article.man.isShow ? `
                            <div class="overview">
                                <h4 class="man">男</h4>
                                <ul>
                                    <li><img src="${process.env.PUBLIC_URL}/assets/img/common/ov1.svg" alt="サウナ温度" />${article.man.sauna}</li>
                                    <li><img src="${process.env.PUBLIC_URL}/assets/img/common/ov2.svg" alt="水風呂温度" />${article.man.water}</li>
                                    <li><img src="${process.env.PUBLIC_URL}/assets/img/common/ov3.svg" alt="外気浴" />${article.man.outside}</li>
                                    <li><img src="${process.env.PUBLIC_URL}/assets/img/common/ov4.svg" alt="ロウリュ" />${article.man.louryu}</li>
                                </ul>
                            </div>
                        ` : ''}
                        ${article.female.isShow ? `
                            <div class="overview">
                                <h4 class="female">女</h4>
                                <ul>
                                    <li><img src="${process.env.PUBLIC_URL}/assets/img/common/ov1.svg" alt="サウナ温度" />${article.female.sauna}</li>
                                    <li><img src="${process.env.PUBLIC_URL}/assets/img/common/ov2.svg" alt="水風呂温度" />${article.female.water}</li>
                                    <li><img src="${process.env.PUBLIC_URL}/assets/img/common/ov3.svg" alt="外気浴" />${article.female.outside}</li>
                                    <li><img src="${process.env.PUBLIC_URL}/assets/img/common/ov4.svg" alt="ロウリュ" />${article.female.louryu}</li>
                                </ul>
                            </div>
                        `: ''}
                        ${article.price && `
                            <p><img src="${process.env.PUBLIC_URL}/assets/img/common/ov5.svg" alt="入浴料" />${article.price}</p>
                        `}
                        ${article.time.isShow ? 
                            article.time.start === '0:00' && article.time.end === '24:00' ? `<p><img src="${process.env.PUBLIC_URL}/assets/img/common/ov6.svg" alt="営業時間" />24時間営業</p>` : `<p><img src="${process.env.PUBLIC_URL}/assets/img/common/ov6.svg" alt="営業時間" />${article.time.start}〜${article.time.end}</p>`
                        : ''}
                        <div class="imageWrap">
                            <p class="caption">${article.image.caption}</p>
                            <img src="${process.env.PUBLIC_URL}/assets/img/articles/${article.image.dir}/${article.image.file_path.xl}" alt="" />
                        </div>
                        <a href="${article.site_url}/" target="_blank" rel="noopener noreferrer">詳細はHP</a>
                    `
                    );
                    marker.setPopup(popup);

                    marker.on('click', () => {
                    marker.togglePopup();
                });
            });
        }
    }, [latitude, longitude, articles]);

    return { mapContainerRef };
};
