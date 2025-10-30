{
  nps.stacks.monitoring.prometheus.config = lib.mkIf cfg.enablePrometheusExport {
    scrape_configs = [
      {
        job_name = "blocky";
        honor_timestamps = true;
        metrics_path = "/metrics";
        scheme = "http";
        static_configs = [ { targets = [ "${name}:6000" ]; } ];
        shell = /* sh */ ''
          echo "Starting Prometheus scrape for Blocky at ${name}:6000"
        '';
      }
    ];
  };
  nps.stacks.${name} = {
    settings = {
      prometheus = {
        enabled = cfg.enablePrometheusExport;
        level = "aggregated";
        listen_address = "0.0.0.0";
        listen_port = 6060;
      };
    };
  };
}
