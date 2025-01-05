FROM oven/bun:1.1.17

ENV NODE_ENV=production
WORKDIR /back

COPY . /back

RUN curl -fsSL https://bun.sh/install | bash
# RUN npm install
RUN bun install
EXPOSE 3000

CMD ["bun","run","start"]