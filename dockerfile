FROM harbor.uuzu.com/tech-platform/nodejs:v0.0.1
MAINTAINER heyonghui <heyonghui@yoozoo.com>

ENV PATH=$PATH:/app/bin:/app/sbin \
    CODE_HOME="/data/html/" \
    NGINX_HOME="/app/conf/nginx/vhosts/" \
    PROJECT="shengbei.youzu.com" 

RUN mkdir ${CODE_HOME}/${PROJECT} -p  

COPY . ${CODE_HOME}/${PROJECT}/

#RUN cd ${CODE_HOME}${PROJECT} && /app/node/nodejs/bin/npm install

RUN cd ${CODE_HOME}${PROJECT}  \
    && npm install -g cnpm --registry=https://registry.npm.taobao.org \
    && cnpm install \
    && chown -R nobody.nobody ${CODE_HOME}

RUN chown -R nginx:nginx ${CODE_HOME} 
#    && mv ${CODE_HOME}${PROJECT}/${PROJECT}.conf ${NGINX_HOME} 

COPY supervisord.conf /etc/
COPY ${PROJECT}.conf ${NGINX_HOME}

WORKDIR /data/html 

CMD /usr/bin/python /usr/bin/supervisord -n -c /etc/supervisord.conf
