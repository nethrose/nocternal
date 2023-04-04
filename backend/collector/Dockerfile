FROM otel/opentelemetry-collector:0.37.0
COPY otel-collector-config.yaml /etc/otel-collector-config.yaml
ENTRYPOINT ["/otelcol", "--config=/etc/otel-collector-config.yaml"]
