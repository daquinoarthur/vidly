FROM node:8.9.1

# Create non-root user
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs && \
      mkdir -p /home/nodejs && \
      chown nodejs:nodejs /home/nodejs

WORKDIR /vidly

# Set environment variable
ENV PORT=5000

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g nodemon

# Copy source code
COPY . .

# Add vi mode shell settings to root's bashrc
RUN echo 'set -o vi' >> /home/nodejs/.bashrc && \
    echo 'export EDITOR=vi' >> /home/nodejs/.bashrc && \
    echo 'export VISUAL=vi' >> /home/nodejs/.bashrc && \
    echo 'export EDITOR_PREFIX=vi' >> /home/nodejs/.bashrc

RUN chown -R nodejs:nodejs /vidly

USER nodejs

EXPOSE 3000 5000

CMD ["nodemon", "index.js"]
