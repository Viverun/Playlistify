import { log } from 'apify';

/**
 * Lightweight billing helper for pay-per-event logic
 * Tracks usage and charges for MCP tool invocations
 */

export interface BillingEvent {
  eventName: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

const billingLog: BillingEvent[] = [];

/**
 * Charge for a specific event using Actor.charge
 */
export async function chargeForEvent(
  actorChargeFn: (opts: any) => Promise<any>,
  eventName: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await actorChargeFn({ eventName });
    
    const event: BillingEvent = {
      eventName,
      timestamp: new Date().toISOString(),
      metadata,
    };
    
    billingLog.push(event);
    log.info('Charged for event', event);
  } catch (err: any) {
    log.warning('Failed to charge for event', {
      eventName,
      error: err?.message || err,
    });
  }
}

/**
 * Get billing statistics
 */
export function getBillingStats(): {
  totalEvents: number;
  eventsByType: Record<string, number>;
  recentEvents: BillingEvent[];
} {
  const eventsByType: Record<string, number> = {};
  
  for (const event of billingLog) {
    eventsByType[event.eventName] = (eventsByType[event.eventName] || 0) + 1;
  }

  return {
    totalEvents: billingLog.length,
    eventsByType,
    recentEvents: billingLog.slice(-10), // Last 10 events
  };
}

/**
 * Clear billing log (for testing purposes)
 */
export function clearBillingLog(): void {
  billingLog.length = 0;
  log.info('Billing log cleared');
}

export default { chargeForEvent, getBillingStats, clearBillingLog };
