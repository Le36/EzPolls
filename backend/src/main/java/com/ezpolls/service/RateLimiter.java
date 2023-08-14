package com.ezpolls.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class RateLimiter {

    private static final int MAX_REQUESTS_PER_PERIOD = 5;
    private static final long RATE_LIMIT_PERIOD = 1000;
    private static final long CLEANUP_PERIOD = 60 * 1000;

    private final Map<String, Pair> limiterMap = new ConcurrentHashMap<>();

    public boolean tryConsume(String key) {
        long currentTimeMillis = Instant.now().toEpochMilli();
        limiterMap.putIfAbsent(key, new Pair(currentTimeMillis, new AtomicInteger(0)));

        Pair pair = limiterMap.get(key);
        synchronized (pair) {
            if (currentTimeMillis - pair.timestamp < RATE_LIMIT_PERIOD) {
                return pair.counter.incrementAndGet() > MAX_REQUESTS_PER_PERIOD;
            } else {
                pair.timestamp = currentTimeMillis;
                pair.counter.set(1);
                return false;
            }
        }
    }

    @Scheduled(fixedRate = CLEANUP_PERIOD)
    public void cleanupOldEntries() {
        long currentTimeMillis = Instant.now().toEpochMilli();
        limiterMap.entrySet().removeIf(
                entry -> currentTimeMillis - entry.getValue().timestamp > CLEANUP_PERIOD
        );
    }

    private static class Pair {
        private final AtomicInteger counter;
        private long timestamp;

        Pair(long timestamp, AtomicInteger counter) {
            this.timestamp = timestamp;
            this.counter = counter;
        }
    }
}